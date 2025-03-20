import { useTranslation } from "react-i18next";

type FileSelectorProps = {
    applicationType: string;
    fileInputRef: React.RefObject<HTMLInputElement>;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    clearFile: () => void;
    labelText: string;
    labelId: string;
    note?: string;
    multiple?: boolean;
};

export function FileSelector({ applicationType, fileInputRef, handleFileChange, clearFile, labelText, labelId, note, multiple }: FileSelectorProps) {
    const { t } = useTranslation();

    return (
        <div className="mb-3">
            <label htmlFor={labelId} className={`form-label ${!multiple && applicationType === 'new_permit' ? "required" : ""}`}>{labelText}</label>
            <input
                ref={fileInputRef}
                id={labelId}
                multiple={multiple}
                type="file"
                className="form-control mb-2"
                name={labelId}
                onChange={handleFileChange}
                required={!multiple && applicationType === 'new_permit'}
            />
            <button type="button" className="btn btn-secondary btn-sm me-2" onClick={clearFile}>
                {t("clear")}
            </button>
            {(multiple || applicationType !== 'new_permit') && (
                <small className="form-text text-muted">
                    {note}
                </small>
            )}
        </div>
    );
}