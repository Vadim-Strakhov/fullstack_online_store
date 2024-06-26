import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../context";
import { Card, Row } from "react-bootstrap";

const BrandBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <Row className="d-flex" xs="auto">
      {device.brands.map((brand) => (
        <Card
          style={{ cursor: "pointer" }}
          key={brand.id}
          className="p-3"
          onClick={() => device.setSelectedBrand(brand)}
          border={brand.id === device.selectedBrand.id ? "info" : "light"}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  );
});
export default BrandBar;
