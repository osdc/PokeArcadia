import { Outlet } from 'react-router-dom'



function RootLayout() {
  return (

    <div className='root scrollbar bg-bgblue selection:text-bgPrimaryBg'>

        <main className='main '>
            <Outlet/>
        </main>
    </div>


   
  )
}

export default RootLayout