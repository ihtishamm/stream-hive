function getInitials(name: string): string {
    if (!name) {
        return '';
    }


    const nameParts = name.split(" ");
    const initials = nameParts.map(part => part[0]).join("").toUpperCase();
    return initials.length > 2 ? initials.slice(0, 2) : initials;
}

export default getInitials;