interface TableProps {
    children: React.ReactNode | React.ReactNode[]
}

export const Table: React.FC<TableProps> = ({ children }) => {
    return (
        <table className="w-full border border-solid border-black border-collapse">
            <thead>
                {Array.isArray(children) ? children[0] : children}
            </thead>
            <tbody>
                {Array.isArray(children) ? children.filter((_, index) => index !== 0) : null}
            </tbody>
        </table>
    )
}

export const Row: React.FC<TableProps> = ({ children }) => {
    return (
        <tr className="border border-solid border-black border-collapse">
            {children}
        </tr>
    )
}

export const HeadCell: React.FC<TableProps> = ({ children }) => {
    return (
        <th className="border px-2 py-0.5 border-solid border-black border-collapse font-bold">
            {children}
        </th>
    )
}

interface CellProps {
    span?: number
    children: React.ReactNode | React.ReactNode[]
}

export const Cell: React.FC<CellProps> = ({ children, span }) => {
    return (
        <td className="border px-2 py-1 border-solid border-black border-collapse" colSpan={span || 1}>
            {children}
        </td>
    )
}
