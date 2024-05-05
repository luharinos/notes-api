class Note {
	constructor(id, title, description) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}

export default Note;
