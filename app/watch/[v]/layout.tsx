import { PageHeader } from '@/components/Header'
import {  ReactNode } from 'react'

 interface SearchLayoutProps {
    children: ReactNode
     }

const SearchLayout:React.FC<SearchLayoutProps> = ({ children }) => {
    return (
        <div className="max-h-screen flex flex-col">
      <PageHeader/>
       
         <div className='px-4'>{children}</div>
       
      </div>
    
    )
  }
  
  export default SearchLayout