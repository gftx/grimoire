import { useAuthStore } from "@/store/auth";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/shared/config/routes";
import styles from "./styles.module.scss";
import gendalf from "@/shared/assets/gendalf.png";
import { useMemo } from "react";
// import { Footer } from "@/shared/ui/Footer/index";

const FANTASY_QUOTES = [
  'not all those who wander are lost. – j.r.r. tolkien',
  'magic is believing in yourself, if you can do that, you can make anything happen. – johann wolfgang von goethe',
  'even the smallest person can change the course of the future. – j.r.r. tolkien',
  'the world is full of magic things, patiently waiting for our senses to grow sharper. – w.b. yeats',
  'happiness can be found even in the darkest of times, if one only remembers to turn on the light. – j.k. rowling',
  'courage is found in unlikely places. – j.r.r. tolkien',
  'the moment you doubt whether you can fly, you cease forever to be able to do it. – j.m. barrie',
  'there is a little witch in all of us. – alice hoffman',
  'all we have to decide is what to do with the time that is given us. – j.r.r. tolkien',
  'the world is changed by your example, not by your opinion. – paulo coelho',
  'imagination is the only weapon in the war against reality. – lewis carroll',
  'believe in your heart that you are meant to live a life full of passion, purpose, magic and miracles. – roy t. bennett',
  'books are a uniquely portable magic. – stephen king',
  'the universe is made of stories, not of atoms. – muriel rukeyser',
  'sometimes, you have to believe in magic. – unknown',
  'every great magic trick consists of three parts or acts. – christopher priest',
  'the greatest secrets are always hidden in the most unlikely places. – roald dahl',
  'those who don\'t believe in magic will never find it. – roald dahl',
  'you are never too old to set another goal or to dream a new dream. – c.s. lewis',
  'dreams are the touchstones of our character. – henry david thoreau',
  'all magic comes with a price. – once upon a time',
  'the stars incline us, they do not bind us. – william shakespeare',
  'to the well-organized mind, death is but the next great adventure. – j.k. rowling',
  'the world needs dreamers and the world needs doers. but above all, the world needs dreamers who do. – sarah ban breathnach',
];

export const MainPage = () => {
  const { user } = useAuthStore();
  const isAuthenticated = !!user;
  const randomQuote = useMemo(() => {
    return FANTASY_QUOTES[Math.floor(Math.random() * FANTASY_QUOTES.length)];
  }, []);

  return (
    <div className={styles.mainPage}>
      <img src={gendalf} alt="wizard" className={styles.illustration} />
      <div className={styles.fantasyQuote}>{randomQuote}</div>
      {isAuthenticated ? (
        <div className={styles.authenticated}>
          <h1 className={styles.title}>welcome back, {user.username}</h1>
          <p className={styles.subtitle}>your available features</p>

          <div className={styles.features}>
            <Link to={AppRoutes.VAULT} className={styles.featureCard}>
              <h2>vault</h2>
              <p>store and grow your ideas, drafts, scripts, and notes.</p>
            </Link>

            <Link to={AppRoutes.JOURNAL} className={styles.featureCard}>
              <h2>journal</h2>
              <p>track your daily thoughts and activities.</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.guest}>
          <h1 className={styles.title}>welcome to grimoire</h1>
          <p className={styles.subtitle}>
            manage your quests, projects, and ideas with magic
          </p>

          <div className={styles.actions}>
            <Link to={AppRoutes.LOGIN} className={styles.loginButton}>
              login
            </Link>
            <Link to={AppRoutes.REGISTER} className={styles.registerButton}>
              register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
