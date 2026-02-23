import styles from "./loading.module.css";

function MealsLoadingPage() {
  return <p className={styles.loading}>Fetching meals.</p>;
}

export default MealsLoadingPage;
