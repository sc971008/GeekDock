import { Modal,Button,ModalBody,ModalFooter,ModalHeader } from 'reactstrap';
import { useState } from 'react';

const SavePage = ({user}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    let {save_lists} = user;
    console.log(user)

    return (
        <div>
        <Button color="danger" onClick={toggle}>
          Click Me
        </Button>
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
          Chose A list to Save : 
            <select>
                {save_lists.map((qlist,idx)=>(
                    <option key={idx} >{qlist.name}</option>
                ))}                
            </select>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Do Something
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>     
    )
    }

export default SavePage