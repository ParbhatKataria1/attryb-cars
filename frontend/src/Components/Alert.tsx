import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"
import { useRef } from "react"

export interface AlertDialogSchema{
title:string, 
_id:string, 
setdelete:(_id:string)=>void,
heading:string, 
description:string

}
export function ButtonDialog({title, _id, setdelete, heading, description}:AlertDialogSchema) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef<any>();
    
    return (
      <>
        <Button size='sm' colorScheme='red' onClick={ onOpen}>
          {title}
        </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {heading}
              </AlertDialogHeader>
  
              <AlertDialogBody>
                {description}
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={()=>{setdelete(_id); onClose}} ml={3}>
                  {title}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }