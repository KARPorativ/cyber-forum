import React from 'react'
import { Tag } from '../../../types/Post'
import classes from './PostItem.module.css'

type Props = {
  tag: Tag
}

const TagsItem = ({tag}: Props) => {
  return (
    <div className={classes.tag}>{tag.tag || 'Без тегов'}</div>
  )
}

export default TagsItem;