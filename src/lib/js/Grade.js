class GradeD {
	constructor(min_perc, max_perc, grade) {
		this.min_perc = min_perc;
		this.max_perc = max_perc;
		this.grade = grade;
	}
	copyConstructor(other) {
		this.min_perc = other.min_perc;
		this.max_perc = other.max_perc;
		this.grade = other.grade;
	}
	copy() {
		return new GradeD(this.min_perc, this.max_perc, this.grade);
	}
}
class GradesD {
	constructor(name, grades) {
		this.name = name;
		this.grades = grades;
	}
	addGrade(grade) {
		this.grades = [...this.grades, grade];
	}
	copyConstructor(other) {
		this.name = other.name;
		this.grades = other.grades.map((e) => e.copy());
	}
	copy() {
		var a = [];
		for (var i = 0; i < this.grades.length; i++) {
			a.push(this.grades[i].copy());
		}
		return new GradesD(this.name, a);
	}
}

export { GradeD, GradesD };
