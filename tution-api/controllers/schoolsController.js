import { prisma } from "../prisma/client.js";

export const addSchool = async (req, res) => {
  try {
    const { name, location, tution, school, isRegistered, isActive, schoolId } = req.body;
    const newSchool = await prisma.school.create({
      data: { name, location, tution, school, isRegistered, isActive, schoolId },
    });

    console.log("school added ✅");
    res.status(200).json(newSchool);
  } catch (error) {
    console.log("Error==>" + error.message);
    res.status(500).json({ error: error });
  }
};

export const schools = async (req, res) => {
  try {
    const getSchools = await prisma.school.findMany();
    console.log("schools wired ✅");
    res.status(200).json(getSchools);
  } catch (error) {
    console.log("Error==>" + error.message);
    res.status(500).json({ error: error });
  }
};

export const school = async (req, res) => {
  console.log("waiting");
  try {
    const id = parseInt(req.params.school);
    const getSchoolById = await prisma.school.findUnique({
      where: { id },
    });
    console.log("school gotten ✅");
    res.status(200).json(getSchoolById);
  } catch (error) {
    console.log("Error==>" + error.message);
    res.status(500).json({ error: error });
  }
};

export const updateSchool = async (req, res) => {
  console.log("waiting");
  try {
    const { name, location, tution, school, isRegistered, isActive, schoolId } = req.body;
    // const id = parseInt(req.params.school);
    const schoolUpdate = await prisma.school.upsert({
      where: { schoolId },
      update: { name, location, tution, isRegistered, isActive },
      create: { name, location, tution, school, isRegistered, isActive, schoolId },
    });
    console.log("school updated ✅");
    res.status(200).json(schoolUpdate);
  } catch (error) {
    console.log("Error==>" + error.message);
    res.status(500).json({ error: error });
  }
};
