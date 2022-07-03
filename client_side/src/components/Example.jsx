//Functional Components

function Greeting(props){
    const [name , setName] = useState('Mary');
    
    function handleNameChange(e){
     setName(e.target.value);
   }
    
     return (
               <section>
                  <label>
                    Name: <br/>
                  <input value={name} onChange={handleNameChange}/> 
                  </label>
               </section>
            );
  }
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<Greeting />);
  