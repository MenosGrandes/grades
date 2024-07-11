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
  between(perc) {
    return perc >= this.min_perc && perc <= this.max_perc;
  }
}
class GradesD {
  constructor(name, grades, max_points) {
    this.name = name;
    this.grades = grades;
    this.max_points = max_points;
  }
  addGrade(grade) {
    this.grades = [...this.grades, grade];
  }
  copyConstructor(other) {
    this.name = other.name;
    this.grades = other.grades.map((e) => e.copy());
    this.max_points = other.max_points;
  }
  copy() {
    var a = [];
    for (var i = 0; i < this.grades.length; i++) {
      a.push(this.grades[i].copy());
    }
    return new GradesD(this.name, a, this.max_points);
  }
}
/*
 * x - points
 * 100 - maxPoints
 * */
const calcPerc = (_points, _maxPoints) => {
  console.log("points" + _points);
  console.log("max_points" + _maxPoints);
  const _v = (100 * _points) / _maxPoints;
  console.log(_v);
  return _v;
};
class GradingSystemD {
  static grade(_grades, _points) {
    if (_points) {
      const _perc = calcPerc(_points, _grades.max_points);
      for (var i = 0; i < _grades.grades.length; i++) {
        if (_grades.grades[i].between(_perc)) {
          return _grades.grades[i].grade;
        }
      }
      throw new Error(
        `Some grade should be added! for ${_perc} in ${_grades.name}`,
      );
    }
  }
}

export { GradeD, GradesD, GradingSystemD };
