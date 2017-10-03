export function getInputChange(e) {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if (target.type === 'number') {
        value = parseFloat(value);
        if (Number.isNaN(value)) {
            value = 0;
        }
    }
    const name = target.name;

    return {[name]: value};
}