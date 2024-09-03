'use client'
import PaymentEmployeeTabs from "./PaymentEmployeeTabs";

export default function Payment({affectations}: {affectations: any}) {
    const dataAffectations = affectations ? affectations['hydra:member'] : []
    
    return (
        <div>
            <PaymentEmployeeTabs dataAffectations={dataAffectations} />
        </div>
    )
}