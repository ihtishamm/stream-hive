function generateUniqueChannelName(name: string, maxLength: number = 20): string {
    const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '');

    const randomNumber = Math.floor(Math.random() * 10000);

    const combinedName = `${sanitizedName}${randomNumber}`;

    return combinedName.length > maxLength ? combinedName.slice(0, maxLength) : combinedName;
}

export default generateUniqueChannelName;