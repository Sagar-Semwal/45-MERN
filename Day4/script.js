const skills = [
  { name: 'HTML', proficiency: 'Intermediate' },
  { name: 'CSS', proficiency: 'Intermediate' },
  { name: 'JavaScript', proficiency: 'Advanced' },
  { name: 'Python', proficiency: 'Beginner' },
  { name: 'React', proficiency: 'Intermediate' }
];

function formatSkills(skillsArray) {
  return skillsArray.map(skill => `${skill.name} (${skill.proficiency})`);
}

const formattedSkills = formatSkills(skills);
console.log(formattedSkills);
