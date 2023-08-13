import { useState } from 'react'
import styles from './Comment.module.css'
import { Trash, ThumbsUp } from 'phosphor-react'

interface CommetProps {
  content: string;
  onDeleteComment: (comment: string) => void
}

export default function Comment({ content, onDeleteComment }: CommetProps) {
  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment() {
    onDeleteComment(content)
    console.log('feletar ${comment}')
  }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1
    })
  }

  return (
    <div className={styles.comment}>
      <img src="https:github.com/Dianine.png" alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>
                Dianine Costa
              </strong>

              <time
                title='12 de julho de 2023 às 21:45:00'
                dateTime='2023-07-12 21:38:00'
              >
                Cerca de 1h atrás
              </time>
            </div>

            <button
              title='Deletar comentário'
              onClick={handleDeleteComment}

            >
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button
            onClick={handleLikeComment}
          >
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>

      </div>
    </div>
  )
}