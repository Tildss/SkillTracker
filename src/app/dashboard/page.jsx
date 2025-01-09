"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './Dashboard.module.css'; // Importer le fichier CSS

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function fetchRandomUser() {
      try {
        const userResponse = await fetch('/api/randomUser');
        const userData = await userResponse.json();
        setUser(userData);

        const skillsResponse = await fetch(`/api/userSkills?userId=${userData.id}`);
        const skillsData = await skillsResponse.json();
        setSkills(skillsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    }

    fetchRandomUser();
  }, []);

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tableau de Bord SkillTracker</h1>
      <p className={styles.description}>Bienvenue, {user.name}. Suivez et améliorez vos compétences efficacement.</p>
      <div className={styles.skillsContainer}>
        {skills.map(skillLevel => (
          <div key={skillLevel.id} className={styles.skillCard} onClick={() => router.push(`/skills/${skillLevel.skill.id}`)}>
            <h2 className={styles.skillName}>{skillLevel.skill.name}</h2>
            <p className={styles.skillDescription}>{skillLevel.skill.description}</p>
            <p className={styles.skillCategory}>Catégorie: {skillLevel.skill.category?.name}</p>
            <p className={styles.skillLevel}>Niveau: {skillLevel.level}</p>
            <p className={styles.skillProgress}>Progression: {skillLevel.progress}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
