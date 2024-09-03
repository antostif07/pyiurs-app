export default function dataToFormData(data: any) {
    const form_data = new FormData();

    for ( const key in data ) {
        form_data.append(key, data[key]);
    }

    return form_data;
}