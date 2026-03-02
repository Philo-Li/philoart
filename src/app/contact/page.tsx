import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact PhiloArt",
};

export default function ContactPage() {
  return (
    <div>
      <div className="container-col-login">
        <div className="profile-item">
          <h3 className="header-bold">Contact Us</h3>
        </div>
        <div className="col-item-3">
          <h5>
            If you have any questions or suggestions that might make the PhiloArt experience even
            better, please let us know! You can get in touch with us at philoart42@gmail.com.
          </h5>
        </div>
      </div>
    </div>
  );
}
