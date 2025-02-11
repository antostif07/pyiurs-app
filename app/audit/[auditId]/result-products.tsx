import apiGetData from "@/src/actions/apiGetData";
import {Audit} from "@/src/common/Audit";
import {AuditProduct} from "@/src/common/AuditProduct";
import {columns} from "@/src/ui/audit/audit-product-columns";
import DataTableErrorWrapper from "@/src/ui/DataTableErrorWrapper";

export default async function ResultProducts(props: {
    audit: Audit,
    page?: string,
}) {
    const currentPage = Number(props.page) || 1

    const auditProducts = await apiGetData<AuditProduct>(`/audit_products?auditId=${props.audit.id}&type=result&page=${currentPage}`, 'auditProducts')

    console.log(auditProducts)

    return (
        <DataTableErrorWrapper
            data={auditProducts} columns={columns}
        />
    )
}