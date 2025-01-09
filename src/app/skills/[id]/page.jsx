"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from './SkillDetail.module.css';

export default function SkillDetail() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const userId = 1; // Remplacez par l'ID de l'utilisateur connecté
    const [skill, setSkill] = useState(null);

    useEffect(() => {
        async function fetchSkill() {
            try {
                const response = await fetch(`/api/skills/${id}?userId=${userId}`);
                const data = await response.json();
                setSkill(data);
            } catch (error) {
                console.error('Erreur lors de la récupération de la compétence:', error);
            }
        }

        fetchSkill();
    }, [id, userId]);

    if (!skill) {
        return <div>Chargement...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{skill.name}</h1>
            <p className={styles.description}>{skill.description}</p>
            <p className={styles.category}>Catégorie: {skill.category?.name}</p>
            <ul className={styles.levels}>
                {skill.skillLevels.map(level => (
                    <li key={level.id} className={styles.level}>
                        Niveau: {level.level}, Progression: {level.progress}%
                    </li>
                ))}
            </ul>
            <button onClick={() => router.back()} className={styles.backButton}>Retour</button>
        </div>
    );
}