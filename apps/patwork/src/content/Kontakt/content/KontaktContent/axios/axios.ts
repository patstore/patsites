import axios from 'axios';
import { env } from '@/env';

const axiosclient = () => {
	return axios.create({
		baseURL: env.patstore.apiUrl,
		headers: {
			'X-Parse-Application-Id': env.patstore.appId,
			'X-Parse-REST-API-Key': env.patstore.restKey,
			'X-Parse-Master-Key': env.patstore.masterKey,
		},
	});
};

export default axiosclient;
