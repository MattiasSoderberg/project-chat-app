export const createSlug = (title: string) => {
    return title.replace(/\s/g, '-').toLowerCase()
}