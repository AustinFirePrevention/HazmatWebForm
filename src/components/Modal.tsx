import { useTranslation } from 'react-i18next';
import { Modal, Button } from "react-bootstrap"
import { SummaryModalContent } from "./SummaryModal"
import { FeeAggregate } from '../helpers/FeeProcessor';

export type Status = "success" | "successCantShowFees" | "error" | "fileError"

const content = {
    success: {
        title: "modal.success.title",
        body: "modal.success.body",
        showSummary: true,
        isPassing: true
    },
    successCantShowFees: {
        title: "modal.successCantShowFees.title",
        body: "modal.successCantShowFees.body",
        showSummary: false,
        isPassing: true
    },
    fileError: {
        title: "modal.fileError.title",
        body: "modal.fileError.body",
        showSummary: false,
        isPassing: false
    },
    error: {
        title: "modal.error.title",
        body: "modal.error.body",
        showSummary: false,
        isPassing: false
    }
} as Record<Status, { title: string, body: string, showSummary: boolean, isPassing: boolean }>

export function SubmissionModal({ showModal, setShowModal, status, fees }: { showModal: boolean, setShowModal: (arg: boolean) => void, status: Status, fees: FeeAggregate }) {
    const { t } = useTranslation();
    const { title, body, showSummary, isPassing } = content[status]

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} size='xl'>
            <Modal.Header className={isPassing ? "bg-success" : "bg-danger"} closeButton>
                <Modal.Title >{t(title)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    <p>{t(body)}</p>
                </div>

                {showSummary && <SummaryModalContent totals={fees} />}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => setShowModal(false)}>
                    {t("modal.close")}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}