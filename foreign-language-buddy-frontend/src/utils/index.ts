export function formatText(text: string) {
    // Apply formatting rules, e.g., bold, italic, headings, links
    return text.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
        .replace(/__(.+?)__/g, '<i>$1</i>')
    // ... other formatting rules
}

export const generateChartCode = (chartData: any) => {
    const codeString = `${chartData}`;
    return codeString;
};
