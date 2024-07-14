import AppRoutes from "./routes/App.route"

function App() {

  return (
    <div className='relative flex flex-col justify-between min-h-screen px-6 py-4 sm:py-8 sm:px-12 font-primaryRegular max-w-screen'>
        <AppRoutes />   
    </div>
  )
}

export default App;