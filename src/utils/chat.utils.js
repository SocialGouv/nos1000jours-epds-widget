import { Button } from "react-bootstrap"

/**
 * @param {*} setChatButtonElement set la ref du bouton pour pouvoir utiliser le click et ouvrir le chat
 * @returns Bouton caché car le trigger est dans la classe "open-zammad-chat"
 */
export const hideChatButton = (setChatButtonElement) => (
  <Button
    className="open-zammad-chat"
    ref={(input) => setChatButtonElement(input)}
    style={{ display: "none" }}
  />
)

export const zammadChatParameters = {
  fontSize: "12px",
  background: "#26366E",
  chatId: process.env.NEXT_PUBLIC_PASTEK_CHAT_ID,
  debug: false,
  show: false,
  flat: true,
  cssAutoload: true,
  title: "<strong>Cliquez ici</strong> pour discuter avec Élise",
  host: "wss://pastek.fabrique.social.gouv.fr/ws",
}
