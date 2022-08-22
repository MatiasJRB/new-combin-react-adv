

export const validateSSN = (ssn: string) => {
    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
    return ssnRegex.test(ssn);
}

