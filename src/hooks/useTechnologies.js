import { useMemo, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

export const STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
};

export const STATUS_LABELS = {
  [STATUS.NOT_STARTED]: 'Не начат',
  [STATUS.IN_PROGRESS]: 'В работе',
  [STATUS.COMPLETED]: 'Выполнено'
};

export const STATUS_COLORS = {
  [STATUS.NOT_STARTED]: '#9e9e9e',
  [STATUS.IN_PROGRESS]: '#ff9800',
  [STATUS.COMPLETED]: '#4caf50'
};

const useTechnologies = () => {
  const [roadmap, setRoadmap] = useLocalStorage('roadmap', null);
  const [userProgress, setUserProgress] = useLocalStorage('userProgress', {});

  const getTechnologyById = useCallback((id) => {
    if (!roadmap || !roadmap.items) return null;
    const tech = roadmap.items.find(item => item.id === id);
    if (!tech) return null;
    
    const progress = userProgress[id] || {};
    return {
      ...tech,
      status: progress.status || STATUS.NOT_STARTED,
      notes: progress.notes || '',
      deadline: progress.deadline || null
    };
  }, [roadmap, userProgress]);

  const technologies = useMemo(() => {
    if (!roadmap || !roadmap.items) return [];
    return roadmap.items.map(item => ({
      ...item,
      status: userProgress[item.id]?.status || STATUS.NOT_STARTED,
      notes: userProgress[item.id]?.notes || '',
      deadline: userProgress[item.id]?.deadline || null
    }));
  }, [roadmap, userProgress]);

  const progress = useMemo(() => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(t => t.status === STATUS.COMPLETED).length;
    return Math.round((completed / technologies.length) * 100);
  }, [technologies]);

  // Calculate progress stats
  const stats = useMemo(() => {
    const total = technologies.length;
    const completed = technologies.filter(t => t.status === STATUS.COMPLETED).length;
    const inProgress = technologies.filter(t => t.status === STATUS.IN_PROGRESS).length;
    const notStarted = technologies.filter(t => t.status === STATUS.NOT_STARTED).length;
    
    return { total, completed, inProgress, notStarted };
  }, [technologies]);

  const updateStatus = useCallback((id, status) => {
    setUserProgress(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        status
      }
    }));
  }, [setUserProgress]);

  const updateNotes = useCallback((id, notes) => {
    setUserProgress(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        notes
      }
    }));
  }, [setUserProgress]);

  const updateDeadline = useCallback((id, deadline) => {
    setUserProgress(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        deadline
      }
    }));
  }, [setUserProgress]);

  const importRoadmap = useCallback((data) => {
    // Validate required fields
    if (!data || typeof data !== 'object') {
      throw new Error('Неверный формат файла: ожидается JSON объект');
    }
    if (!data.title || typeof data.title !== 'string') {
      throw new Error('Неверный формат файла: отсутствует название карты (title)');
    }
    if (!Array.isArray(data.items)) {
      throw new Error('Неверный формат файла: отсутствует массив пунктов (items)');
    }

    for (const item of data.items) {
      if (!item.id) {
        throw new Error('Неверный формат файла: каждый пункт должен иметь уникальный идентификатор (id)');
      }
      if (!item.title || typeof item.title !== 'string') {
        throw new Error(`Неверный формат файла: пункт ${item.id} должен иметь название (title)`);
      }
    }

    setRoadmap({
      title: data.title,
      description: data.description || '',
      items: data.items.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description || '',
        resources: item.resources || []
      }))
    });

    if (data.userProgress) {
      setUserProgress(data.userProgress);
    } else {
      setUserProgress({});
    }
  }, [setRoadmap, setUserProgress]);

  const exportRoadmap = useCallback(() => {
    if (!roadmap) return null;
    
    return {
      ...roadmap,
      userProgress,
      exportedAt: new Date().toISOString()
    };
  }, [roadmap, userProgress]);

  const resetAllProgress = useCallback(() => {
    setUserProgress({});
  }, [setUserProgress]);

  const markAllCompleted = useCallback(() => {
    if (!technologies.length) return;
    
    const newProgress = {};
    technologies.forEach(tech => {
      newProgress[tech.id] = {
        ...userProgress[tech.id],
        status: STATUS.COMPLETED
      };
    });
    setUserProgress(newProgress);
  }, [technologies, userProgress, setUserProgress]);

  const filterByStatus = useCallback((status) => {
    return technologies.filter(t => t.status === status);
  }, [technologies]);

  const searchTechnologies = useCallback((query) => {
    if (!query) return technologies;
    const lowerQuery = query.toLowerCase();
    return technologies.filter(t => 
      t.title.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery)
    );
  }, [technologies]);

  return {
    roadmap,
    technologies,
    progress,
    stats,
    getTechnologyById,
    updateStatus,
    updateNotes,
    updateDeadline,
    importRoadmap,
    exportRoadmap,
    resetAllProgress,
    markAllCompleted,
    filterByStatus,
    searchTechnologies
  };
};

export default useTechnologies;
