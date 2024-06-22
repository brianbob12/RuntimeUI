import React from "react"
import { useState } from "react"
import Tag from "./Tag"

const TagList: React.FC = () => {
  const [tagList, setTagList] = useState<string[]>([])

  const [tagInputValue, setTagInputValue] = useState<string>("")

  const addTag = (tag: string) => {
    setTagList([...tagList, tag])
  }

  const removeTag = (tag: string) => {
    setTagList(tagList.filter(t => t !== tag))
  }


  return (
    <div>
      <div>
        {tagList.map(tag => (
          <div key={tag}>
            <Tag tag={tag} />
            <button onClick={() => removeTag(tag)}>Remove</button>
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          addTag(tagInputValue)
          setTagInputValue("")
        }}>
          <input
            type="text"
            value={tagInputValue}
            onChange={e => setTagInputValue(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}

export default TagList