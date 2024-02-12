import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/selection");
  };

  return (
    <div className="m-16 flex flex-col flex-1">
      <div className="text-infitex text-3xl mb-8">
        Welcome to the Infi-tex visualiser
      </div>
      <div className="text-white text-xl mb-8">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis ducimus,
        dolore corporis accusamus perferendis assumenda corrupti. Molestias
        expedita, ipsum mollitia eaque enim est placeat esse soluta, sed dolorem
        nulla similique unde magnam cumque, sapiente sequi nostrum minima
        reprehenderit modi aperiam saepe corrupti facilis! Quia error recusandae
        expedita, earum quisquam corrupti non voluptates veritatis vitae, omnis
        soluta. Quidem voluptatibus quo velit architecto natus similique at
        dolor, esse culpa reprehenderit. Nobis deserunt, aperiam, quisquam rem
        maiores et hic blanditiis odio voluptate illum tempora ad fuga ipsa
        expedita?
        <br />
        <br />
        Et numquam suscipit consectetur voluptas. Temporibus laborum illo fuga,
        quae culpa, odit doloribus voluptatibus totam repellendus velit ratione
        fugit minima, sit necessitatibus perspiciatis rerum quisquam in modi at
        voluptatum natus aspernatur amet quis laboriosam! Laboriosam saepe quasi
        odit adipisci, incidunt, consequatur rem quia iste repellendus nesciunt
        a debitis voluptatem corrupti illum iusto explicabo deserunt labore
        eaque modi totam, obcaecati aliquam. Hic dolor, illum, nesciunt sunt ut
        doloremque tempora rerum consectetur quis exercitationem eveniet
        recusandae nemo aspernatur modi esse dolorum obcaecati iste. Nisi ut
        excepturi cumque quisquam similique architecto impedit esse recusandae.
        Provident inventore nam non expedita dolorem quae, veniam consequuntur!
        Placeat pariatur quae facere incidunt eius ipsum, minus iusto ab
        perspiciatis laudantium voluptatibus ea eos.
      </div>
      <button className="select-button h-[80px]" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
};

export default StartPage;
