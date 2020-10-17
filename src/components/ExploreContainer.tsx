import React from 'react';
import './ExploreContainer.css';

interface ContainerProps { 
}

const ExploreContainer: React.FC<ContainerProps> = () => {
	return (
		<div className="container">
			<strong>NCKH cấp trường</strong>
			<div>Thử thách 5 ngày chơi app</div>
		</div>
	);
};

export default ExploreContainer;
