import React from 'react';

import { useAppSelector } from '../../../hooks/typedHooks';

import { ProjectChart } from '../../../store/slices/ProjectSlice';

import levelStyles from '../levelStyles';

function TableTasks() {
  const { chart } = useAppSelector((state) => state);

  const createTaskTree = (target: ProjectChart, level: number) => {
    if (!target.sub || target.sub.length === 0) {
      return (
        <li className="table__task" key={target.id}>
          <div className="table__task-info" style={{ paddingLeft: level * 20 }}>
            <div className={`table__task-icon ${levelStyles[level].className}`} />
            <div className="table__task-children-quantity">0</div>
            <div className="table__task-title">{target.title}</div>
          </div>
        </li>
      );
    }

    const onTaskOpen = (e: React.MouseEvent<Element, MouseEvent>) => {
      e.stopPropagation();
      const targetElem = e.currentTarget as HTMLElement;

      targetElem.classList.toggle('table__task-info_opened');
    };

    return (
      <li className="table__task" key={target.id}>
        <div
          className="table__task-info"
          style={{ paddingLeft: level * 20 }}
          onClick={onTaskOpen}
        >
          {(target.sub.length > 0) && <div className="table__task-arrow" />}
          <div className={`table__task-icon ${levelStyles[level].className}`} />
          <div className="table__task-children-quantity">{target.sub.length}</div>
          <div className="table__task-title">{target.title}</div>
        </div>
        <ul className="table__task-children">
          {
            [...target.sub].map((sub) => (
              createTaskTree(sub, level + 1)
            ))
          }
        </ul>
      </li>
    );
  };

  return (
    <div className="table__tasks">
      <div className="table__task-header">Work item</div>
      <ul className="table__task-list">
        {createTaskTree(chart, 1)}
      </ul>
    </div>
  );
}

export default TableTasks;
