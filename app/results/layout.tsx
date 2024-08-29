 import { PageHeader } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import {  ReactNode } from 'react'

 interface SearchLayoutProps {
    children: ReactNode
     }

const SearchLayout:React.FC<SearchLayoutProps> = ({ children }) => {
    return (
        <div className="max-h-screen flex flex-col">
      <PageHeader/>
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <Sidebar />
            <div className="overflow-x-hidden px-8 pb-4">{children}</div>
        </div>
      </div>
    
    )
  }
  
  export default SearchLayout