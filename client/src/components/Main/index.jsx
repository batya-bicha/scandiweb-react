import React from 'react';
import Card from '../Card';
import styles from './Main.module.scss';

const Main = () => {
    return (
        <main className={styles.main}>
            <h2 className={styles.category}>{'{Category name}'}</h2>
            <section className={styles.container}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </section>
        </main>
    );
};

export default Main;
