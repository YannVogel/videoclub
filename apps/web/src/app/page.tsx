import {css} from "@styled-system/css"

const HomePage = () => {
  return (
    <div
      className={css({
        color: "gray.400",
        fontSize: "lg",
      })}
    >
      {/* Page d’accueil vide (placeholder) */}
      Bienvenue au VidéoClub VHS. Sélectionnez une section dans la barre de
      navigation.
    </div>
  )
}

export default HomePage
