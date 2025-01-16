interface GlobalContextType {
    state: any;
    update: (newState: any) => void
}

interface Message {
    content: string;
    role: string;
}
