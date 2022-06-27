interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    createdAt: number;
    status: string;
}

export const seedData: SeedData = {

    entries: [
        {
            description: 'Aliquip velit in nisi adipisicing eu magna reprehenderit ea cupidatat ea pariatur fugiat.',
            createdAt: Date.now(),
            status: 'pending'
        },
        {
            description: 'Nisi ad cupidatat cillum tempor exercitation adipisicing ea velit eu ad.',
            createdAt: Date.now(),
            status: 'in-progress'
        },
        {
            description: 'Sit duis aliqua sunt culpa magna eiusmod proident officia id reprehenderit labore do tempor.',
            createdAt: Date.now(),
            status: 'finished'
        },
    ]

}