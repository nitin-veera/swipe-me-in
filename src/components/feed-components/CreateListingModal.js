import CreateListing from './CreateListing'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    useDisclosure,
    Button
} from '@chakra-ui/react'

function CreateListingModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div>
            <Button w="full" colorScheme='blue' color='yellow' onClick={onOpen}>Post A Listing!</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <CreateListing onClose={onClose} />
                </ModalContent>
            </Modal>
        </div>
    )
}

export default CreateListingModal;