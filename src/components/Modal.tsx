import { Modal, Button } from "react-bootstrap"
import { SummaryModalContent } from "./SummaryModal"

export type Status = "success" | "successCantShowFees" | "error"

const content = {
    success: {
        title: "Form Submission Completed!",
        body: <p>Your form has been submitted successfully.</p>,
        showSummary: true,
        isPassing: true
    },
    successCantShowFees: {
        title: "Form Submission Completed!",
        body: <p>Your form has been submitted successfully. You will receive an email from the Prevention Team with fee totals.</p>,
        showSummary: false,
        isPassing: true
    },
    error: {
        title: "Form Submission Failed!",
        body: (<p>There was an error submitting your form. Please try again. If your issues persist please contact us at <a href='mailto:FirePrevention@austintexas.gov'> FirePrevention@austintexas.gov</a></p>),
        showSummary: false,
        isPassing: false
    }
} as Record<Status, { title: string, body: JSX.Element, showSummary: boolean, isPassing: boolean }>

export function SubmissionModal({ showModal, setShowModal, status, fees }: { showModal: boolean, setShowModal: (arg: boolean) => void, status: Status, fees: any }) {
    const { title, body, showSummary, isPassing } = content[status]

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} size='xl'>
            <Modal.Header className={isPassing ? "bg-success" : "bg-danger"} closeButton>
                <Modal.Title >{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    {body}
                </div>

                {showSummary && <SummaryModalContent totals={fees} />}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}