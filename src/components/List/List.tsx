import React, { FC } from 'react';
import classes from './List.module.css';
 
interface IListProps<T> {
    items: T[];
    renderItem: (item: T, key?: any) => React.ReactNode;
    condition?: boolean;
    inThisCase?: React.ReactNode;
    className?: string;
}
 
const List = <T,>({ items, renderItem, condition, inThisCase, className = '' }: IListProps<T>): React.ReactElement | null => {
    if (condition !== undefined && !condition) {
        return inThisCase ? <>{inThisCase}</> : null;
    }
 
    return (
        <div className={`${classes.list} ${className}`}>
            {items && items.map((item, index) => renderItem(item, index))}
        </div>
    );
};
 
export default List;