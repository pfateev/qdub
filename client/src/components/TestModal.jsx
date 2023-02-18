import { useState } from "react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Textarea
} from '@chakra-ui/react'

export function TestModal() {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    );
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [overlay, setOverlay] = useState(<OverlayOne />)

    return (
        <>
            <Button onClick={() => {
                onOpen();
                setOverlay(<OverlayOne />)
            }} >Open Modal</Button>

            <Modal
                closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Textarea>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore amet libero nostrum! Autem ea eos culpa consectetur. Perferendis aut rem qui facilis harum consectetur eveniet laboriosam nemo ex? Cupiditate, illo.</Textarea>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}