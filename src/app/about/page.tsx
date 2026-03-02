import { Metadata } from "next";
import Link from "next/link";
import aboutImg4 from "../img/aboutImg4.jpg";

export const metadata: Metadata = {
  title: "About",
  description: "About PhiloArt",
};

const img1 =
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1416&q=80";
const img2 =
  "https://images.unsplash.com/photo-1497030947858-3f40f1508e84?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80";
const img3 =
  "https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1492&q=80";

export default function AboutPage() {
  return (
    <div className="about">
      <div className="container-col-login">
        <div className="col-item-4">
          <h1 className="header-bold">About PhiloArt</h1>
        </div>
        <Link href="/about/zh" className="col-item-3">
          中文
        </Link>
      </div>

      <div className="container-col-about">
        <h1 className="subheader">PhiloArt - Made for creators!</h1>
      </div>
      <div className="container-col-about">
        <h1 className="subheader">Outstanding personal artwork site + high quality gallery</h1>
        <h3 className="subheader2">Help you publish and manage your work more easily</h3>
        <h3 className="subheader2">and faster access to the best free copyrighted images</h3>
      </div>

      <div className="container-row-about p-3">
        <div className="container-col-about-item p-3">
          <img src={img2} width="100%" alt="about" />
        </div>
        <div className="container-col-about-item p-3">
          <h2 className="subheader">What you can do with PhiloArt?</h2>
          <p><i className="bi bi-download icon-check" /> Upload, manage and publish your work with rich protocols</p>
          <p><i className="bi bi-search icon-check" /> Discover and follow favorite artists and get instant updates</p>
          <p><i className="bi bi-heart icon-check" /> Discover and download high quality free copyrighted images</p>
          <p><i className="bi bi-plus-square icon-check" /> Like your favorite images and curate your own collections</p>
        </div>
      </div>

      <div className="container-about-row-reverse p-3">
        <div className="container-col-about-item p-3">
          <img src={img3} width="100%" alt="about" />
        </div>
        <div className="container-col-about-item p-3">
          <h2 className="subheader">Whos need PhiloArt?</h2>
          <p><i className="bi bi-palette icon-check" /> Artist</p>
          <p><i className="bi bi-camera icon-check" /> Photographer</p>
          <p><i className="bi bi-pencil icon-check" /> Creator</p>
          <p><i className="bi bi-shop icon-check" /> Designer</p>
          <p><i className="bi bi-emoji-sunglasses icon-check" /> ...And you</p>
        </div>
      </div>

      <div className="container-row-about p-3">
        <div className="container-col-about-item p-3">
          <img src={aboutImg4.src} width="100%" alt="about" />
        </div>
        <div className="container-col-about-item p-3">
          <h2 className="subheader">Why choose PhiloArt?</h2>
          <p><i className="bi bi-check2 icon-check" /> Publish and manage your work with multiple protocols</p>
          <p><i className="bi bi-check2 icon-check" /> Discover best works and free copyrighted works</p>
          <p><i className="bi bi-check2 icon-check" /> Follow favorite artists</p>
          <p><i className="bi bi-check2 icon-check" /> Encourage creativity and inspiration</p>
        </div>
      </div>

      <div className="p-3 container-about-row">
        <img src={img1} width="100%" alt="about" />
      </div>

      <div className="container-col-login">
        <div className="col-item-3 licence-msg text-1rem">
          <p>
            If you have any questions or suggestions that might make the PhiloArt experience even
            better, please let us know at philoart42@gmail.com.
          </p>
        </div>
      </div>
    </div>
  );
}
