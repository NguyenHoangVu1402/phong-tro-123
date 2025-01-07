import React, { memo } from 'react'

const SearchItem = ({IconBefore, IconAfter, text, fontWeight}) => {
  return (
    <div className='bg-white py-2 px-4 rounded-md w-full text-gray-400 text-[13.3px] flex justify-between items-center'>
      <div className='flex items-center gap-1 w-full'>
        {IconBefore}
        <span className={`${fontWeight && 'font-medium text-black'} w-[100px] overflow-hidden text-ellipsis whitespace-nowrap`}>{text}</span>
      </div>
      {IconAfter}
    </div>
  )
}

export default memo(SearchItem)