import { render } from "@testing-library/react";
import { CardDetail } from "./cardDetail";


 describe('component test', function() {
    it('input span should be visible and have correct class', function () {
        const { getByTestId } = render(<CardDetail />);
    
        const nameCaption = getByTestId("name-label-caption");
      
        expect(nameCaption).toBeVisible();
        expect(nameCaption).toHaveClass("name");
      }); 
}); 

