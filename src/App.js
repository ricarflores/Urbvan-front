
import Card from './components/Card'
import Container from './components/Container'
import UserForm from './components/UserForm'
import UserData from './components/UserData'

function App(){
  return(
    <div style={{marginTop: '15%'}}>
      <Container>
        <Card>
          <div style={{padding:20}}>
          <UserData />
          </div>
        </Card>
      </Container>
      <Container>
        <Card>
          <div style={{padding:20}}>
            <UserForm ></UserForm>
          </div>
        </Card>
      </Container>
    </div>
  )
}
export default App;
