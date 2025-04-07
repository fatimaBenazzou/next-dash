interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className="flex justify-center items-center h-64">
            <p className="text-red-500 text-lg">{message}</p>
        </div>
    );
}
