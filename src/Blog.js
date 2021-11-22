import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { fetchData } from "./Api/Apis";
import styles from "./Blog.module.scss";

const Blog = (props) => {
  const [blog, setBlog] = useState({});

  useEffect(() => {
    getBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const blogId = props?.location?.state?.blogId;

  const getBlog = async () => {
    try {
      const data = await fetchData("viewBlogs", true, { blogId });
      setBlog(data);
    } catch (error) {}
  };

  return (
    <div className={styles.blog__main}>
      <figure>
        <img
          src="https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ"
          alt=""
        />
        <figcaption></figcaption>
      </figure>
      <div className={styles.blog__content}>
        <div className={styles.blog__timeAndShare}>
          <div className={styles.blog__time}>{format(new Date(), "PPP")}</div>
          <div className={styles.blog__shareContainer}>
            <FBIcon />
            <WAIcon />
            <TWIcon />
          </div>
        </div>
        <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tortor
          leo, pellentesque sit amet suscipit nec, varius sed ipsum. Vivamus
          porta convallis eleifend. Aenean lobortis, neque et dictum elementum,
          lacus nunc suscipit augue, eget condimentum eros eros in quam. Ut at
          metus nibh. Vivamus fermentum eu tortor ac tempus. Vivamus
          sollicitudin eros risus, in cursus nisl imperdiet non. Nam vitae nunc
          arcu. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Morbi tristique ut lacus nec
          facilisis. Proin ut ipsum fringilla, faucibus urna sed, blandit massa.
          Nunc vehicula tellus urna, ac imperdiet massa venenatis et. Aenean
          accumsan auctor nisl eget fringilla. Maecenas eget dui congue,
          fermentum libero non, porttitor arcu. Sed ac sapien sodales, mattis
          magna et, mattis justo. Sed id lacinia elit, eget posuere ipsum. Fusce
          interdum libero id tortor finibus tincidunt a vitae turpis. Donec nec
          ligula eu sapien eleifend efficitur vel eleifend purus. Proin auctor
          in elit ac dapibus. Integer a aliquet purus, id aliquet ante. Ut et
          risus scelerisque, venenatis justo tristique, pulvinar turpis. Sed id
          ante vitae lacus dignissim imperdiet non eget metus. Fusce eu lectus
          accumsan, fermentum ligula id, tristique purus. Sed molestie rhoncus
          laoreet. Donec suscipit a ligula sed iaculis. Sed eget mauris
          volutpat, iaculis augue id, maximus nisl. Nulla facilisi. Fusce a
          tortor lobortis, aliquet mauris ut, iaculis elit. Vestibulum semper,
          ipsum in euismod porta, nulla ante egestas enim, ut ultricies nisl
          nunc et purus. Maecenas cursus urna a urna laoreet, quis semper libero
          imperdiet. Quisque id aliquam magna. Praesent molestie fermentum
          purus, a dignissim turpis condimentum quis. Integer eu tellus tortor.
          Mauris mollis in magna a dapibus. Pellentesque ut lacus sed mauris
          ultricies sagittis sed eu leo. Aenean tristique, massa at varius
          consequat, libero ipsum molestie leo, commodo auctor magna libero et
          turpis. Suspendisse blandit elit nibh, at vestibulum lacus tincidunt
          eu. Vivamus vulputate ante rutrum nunc ultricies molestie. Curabitur
          malesuada vel quam sed ultricies. Aliquam a eleifend quam. Fusce nec
          augue sed ex scelerisque placerat sed vitae erat. Proin placerat,
          neque quis dignissim rutrum, odio quam congue dolor, a convallis
          turpis massa in diam. Etiam tincidunt nisi vitae sem accumsan
          tincidunt. Suspendisse blandit ultrices euismod. Suspendisse finibus
          quam in dolor bibendum, quis molestie mauris finibus. Integer neque
          nisl, fermentum at sagittis a, pulvinar vel ex. Nulla imperdiet elit
          egestas magna sagittis condimentum. In cursus auctor massa vel
          placerat. Nunc vehicula velit at metus facilisis viverra. Nunc et urna
          laoreet, venenatis nibh vitae, feugiat augue. Phasellus eget nisi a
          neque gravida ultrices nec non sapien. Vivamus viverra tortor quis
          massa ultricies, in convallis justo rhoncus. Nam tincidunt, velit
          condimentum varius faucibus, arcu augue mattis est, non commodo risus
          enim tempus turpis. Sed a odio scelerisque, venenatis nunc ut, pretium
          augue. Phasellus quis rhoncus ligula. Fusce et viverra ligula. Donec
          vulputate sodales ante a sodales. Sed consectetur urna a nulla
          convallis porta. Donec sollicitudin vel mi vitae porta. Phasellus mi
          odio, tincidunt eu metus quis, tempus bibendum libero. Vivamus aliquam
          ullamcorper sem, in finibus nisi malesuada id. Maecenas aliquam
          feugiat lectus. Integer ut augue lacus. Praesent eget mollis nulla.{" "}
        </p>
      </div>
      <div className={styles.blog__scrollToTop} onClick={scrollToTop}>
        <ArrowUp />
      </div>
    </div>
  );
};

export default Blog;

const FBIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="#4267B2"
    class="bi bi-facebook"
    viewBox="0 0 16 16"
  >
    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
  </svg>
);

const WAIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="#25D366"
    class="bi bi-whatsapp"
    viewBox="0 0 16 16"
  >
    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
  </svg>
);

const TWIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="#1DA1F2"
    class="bi bi-twitter"
    viewBox="0 0 16 16"
  >
    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
  </svg>
);

const ArrowUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-chevron-up"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
    />
  </svg>
);
